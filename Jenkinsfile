pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  environment {
    ENV = 'QA'
    BASE_URL = 'https://www.saucedemo.com'
    BROWSER = 'chromium'
  }

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Prepare Allure Metadata') {
      steps {
        sh 'node scripts/allure-env.js'
        sh 'node scripts/allure-executor.js'
        sh 'cp -r allure-report/history allure-results/history || true'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright test'
      }
    }

    stage('Generate Allure Report') {
      steps {
        sh 'npx allure generate allure-results --clean -o allure-report'
      }
    }
  }

  post {
    always {
      allure includeProperties: false, results: [[path: 'allure-results']]
    }
  }
}
