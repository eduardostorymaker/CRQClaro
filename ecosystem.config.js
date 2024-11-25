module.exports = {
  apps : [{
    name: 'app',
    script: './node_modules/next/dist/bin/next',
    args: 'start',
    env: {
      PORT: "3000"
    }
  }, 
  ],
};
