const { exec } = require('child_process');
const ngrok = require('ngrok');
const { spawn } = require('child_process');

// Start the backend server
const backendProcess = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true
});

// When backend is ready, start ngrok
backendProcess.on('spawn', () => {
  console.log('✅ Backend server is starting...');
  
  // Give the backend a moment to start
  setTimeout(async () => {
    try {
      // Start ngrok tunnel
      const url = await ngrok.connect({
        proto: 'http',
        addr: process.env.PORT || 5000,
        region: 'us', // or 'eu', 'ap', 'au', 'sa', 'jp', 'in'
        authtoken: process.env.NGROK_AUTH_TOKEN // Optional: Add your ngrok auth token here
      });
      
      console.log(`🚀 Backend running at: http://localhost:${process.env.PORT || 5000}`);
      console.log(`🌐 Public URL: ${url}`);
      console.log('🔗 Use this URL in your frontend .env file:');
      console.log(`REACT_APP_API_URL=${url}`);
      
      // Handle process termination
      process.on('SIGINT', async () => {
        console.log('\n🛑 Shutting down...');
        await ngrok.kill();
        backendProcess.kill();
        process.exit(0);
      });
      
    } catch (error) {
      console.error('❌ Error starting ngrok:', error);
      backendProcess.kill();
      process.exit(1);
    }
  }, 2000); // Wait 2 seconds for backend to start
});

// Handle backend process errors
backendProcess.on('error', (error) => {
  console.error('❌ Failed to start backend server:', error);
  process.exit(1);
});

// Handle process exit
process.on('exit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
