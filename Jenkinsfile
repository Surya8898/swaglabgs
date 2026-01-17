pipeline {
    agent any

    tools {
        nodejs 'node18'
        allure 'allure'
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
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Prepare Allure Metadata') {
            steps {
                bat 'node scripts\\allure-env.js'
                bat 'node scripts\\allure-executor.js'

                // Preserve history if exists
                bat '''
                if exist allure-report\\history (
                    xcopy /E /I /Y allure-report\\history allure-results\\history
                )
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']],
                tool: 'allure'
            ])
        }
    }
}
