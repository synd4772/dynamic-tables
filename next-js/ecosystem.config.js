module.exports = {
  apps: [{
    name: 'v3',
    script: 'npm',
    args: 'start',
    env: {
      PORT: 3100, // The port your Next.js app is running on
      NODE_ENV: 'development'
    },
    env_production: {         
      NODE_ENV: 'production',
      PORT: 3100
    }
  }],

  deploy: {
    production: {
      user: 'deploy',
      host: '217.159.140.244',
      ref: 'origin/main',
      repo: 'git@github.com-v3:kunstjahobi/v3.git',
      path: '/var/www/v3',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 startOrReload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
