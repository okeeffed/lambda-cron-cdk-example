import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');
import assets = require('@aws-cdk/aws-s3-assets');
import path = require('path');

require('dotenv').config();

export class LambdaCronStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id);

    // The following JavaScript example defines an directory
    // asset which is archived as a .zip file and uploaded to
    // S3 during deployment.
    // See https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html
    // @ts-ignore - this expects Construct not cdk.Construct :thinking:
    const myLambdaAsset = new assets.Asset(this, 'LambdaCronJobExampleZip', {
      path: path.join(__dirname, 'lambda'),
    });

    const lambdaFn = new lambda.Function(this, 'LambdaCronJobExample', {
      code: lambda.Code.fromBucket(
        myLambdaAsset.bucket,
        myLambdaAsset.s3ObjectKey,
      ),
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        SLACK_CHANNEL: process.env.SLACK_CHANNEL as string,
      },
      handler: 'slack-message.handler',
    });

    // Run every day at 6PM UTC
    // See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.expression('cron(0/1 * * * ? *)'),
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFn));
  }
}

const app = new cdk.App();
new LambdaCronStack(app, 'LambdaCronExample');
app.synth();
