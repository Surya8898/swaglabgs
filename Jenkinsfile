pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        ENV = 'QA'
        BASE_URL = 'https://www.saucedemo.com'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install'
                    } else {
                        bat 'npx playwright install'
                    }
                }
            }
        }

        stage('Prepare Allure Metadata') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'node scripts/allure-env.js'
                        sh 'node scripts/allure-executor.js'
                    } else {
                        bat 'node scripts\\allure-env.js'
                        bat 'node scripts\\allure-executor.js'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright test'
                    } else {
                        bat 'npx playwright test'
                    }
                }
            }
        }
    }

   post {
        always {
            allure([
                results: [[path: 'allure-results']],
                reportBuildPolicy: 'ALWAYS'
            ])
        }
    }
}
