module.exports = {
  apps: [
    {
      name: 'ng-app-home',
      script: 'dist/server/index.js',
      watch: 'dist/server',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: 'production',
      },
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload pm2.config.js --env production'
    },
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload pm2.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
