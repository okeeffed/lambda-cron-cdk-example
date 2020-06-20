"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/core");
const assets = require("@aws-cdk/aws-s3-assets");
const path = require("path");
require('dotenv').config();
class LambdaCronStack extends cdk.Stack {
    constructor(app, id) {
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
            code: lambda.Code.fromBucket(myLambdaAsset.bucket, myLambdaAsset.s3ObjectKey),
            timeout: cdk.Duration.seconds(300),
            runtime: lambda.Runtime.NODEJS_12_X,
            environment: {
                SLACK_CHANNEL: process.env.SLACK_CHANNEL,
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
exports.LambdaCronStack = LambdaCronStack;
const app = new cdk.App();
new LambdaCronStack(app, 'LambdaCronExample');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUErQztBQUMvQyx1REFBd0Q7QUFDeEQsOENBQStDO0FBQy9DLHFDQUFzQztBQUN0QyxpREFBa0Q7QUFDbEQsNkJBQThCO0FBRTlCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUUzQixNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxHQUFZLEVBQUUsRUFBVTtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWYsd0RBQXdEO1FBQ3hELHlEQUF5RDtRQUN6RCx3QkFBd0I7UUFDeEIsZ0ZBQWdGO1FBQ2hGLG1FQUFtRTtRQUNuRSxNQUFNLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ3RFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7U0FDckMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUNqRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQzFCLGFBQWEsQ0FBQyxNQUFNLEVBQ3BCLGFBQWEsQ0FBQyxXQUFXLENBQzFCO1lBQ0QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNsQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLFdBQVcsRUFBRTtnQkFDWCxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUF1QjthQUNuRDtZQUNELE9BQU8sRUFBRSx1QkFBdUI7U0FDakMsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLHVHQUF1RztRQUN2RyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUN6QyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUM7U0FDNUQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUFsQ0QsMENBa0NDO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxlQUFlLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDOUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV2ZW50cyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1ldmVudHMnKTtcbmltcG9ydCB0YXJnZXRzID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWV2ZW50cy10YXJnZXRzJyk7XG5pbXBvcnQgbGFtYmRhID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWxhbWJkYScpO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCBhc3NldHMgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtczMtYXNzZXRzJyk7XG5pbXBvcnQgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbmV4cG9ydCBjbGFzcyBMYW1iZGFDcm9uU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihhcHA6IGNkay5BcHAsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhcHAsIGlkKTtcblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgSmF2YVNjcmlwdCBleGFtcGxlIGRlZmluZXMgYW4gZGlyZWN0b3J5XG4gICAgLy8gYXNzZXQgd2hpY2ggaXMgYXJjaGl2ZWQgYXMgYSAuemlwIGZpbGUgYW5kIHVwbG9hZGVkIHRvXG4gICAgLy8gUzMgZHVyaW5nIGRlcGxveW1lbnQuXG4gICAgLy8gU2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9jZGsvYXBpL2xhdGVzdC9kb2NzL2F3cy1zMy1hc3NldHMtcmVhZG1lLmh0bWxcbiAgICAvLyBAdHMtaWdub3JlIC0gdGhpcyBleHBlY3RzIENvbnN0cnVjdCBub3QgY2RrLkNvbnN0cnVjdCA6dGhpbmtpbmc6XG4gICAgY29uc3QgbXlMYW1iZGFBc3NldCA9IG5ldyBhc3NldHMuQXNzZXQodGhpcywgJ0xhbWJkYUNyb25Kb2JFeGFtcGxlWmlwJywge1xuICAgICAgcGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2xhbWJkYScpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbGFtYmRhRm4gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdMYW1iZGFDcm9uSm9iRXhhbXBsZScsIHtcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21CdWNrZXQoXG4gICAgICAgIG15TGFtYmRhQXNzZXQuYnVja2V0LFxuICAgICAgICBteUxhbWJkYUFzc2V0LnMzT2JqZWN0S2V5LFxuICAgICAgKSxcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwMCksXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFNMQUNLX0NIQU5ORUw6IHByb2Nlc3MuZW52LlNMQUNLX0NIQU5ORUwgYXMgc3RyaW5nLFxuICAgICAgfSxcbiAgICAgIGhhbmRsZXI6ICdzbGFjay1tZXNzYWdlLmhhbmRsZXInLFxuICAgIH0pO1xuXG4gICAgLy8gUnVuIGV2ZXJ5IGRheSBhdCA2UE0gVVRDXG4gICAgLy8gU2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9sYW1iZGEvbGF0ZXN0L2RnL3R1dG9yaWFsLXNjaGVkdWxlZC1ldmVudHMtc2NoZWR1bGUtZXhwcmVzc2lvbnMuaHRtbFxuICAgIGNvbnN0IHJ1bGUgPSBuZXcgZXZlbnRzLlJ1bGUodGhpcywgJ1J1bGUnLCB7XG4gICAgICBzY2hlZHVsZTogZXZlbnRzLlNjaGVkdWxlLmV4cHJlc3Npb24oJ2Nyb24oMC8xICogKiAqID8gKiknKSxcbiAgICB9KTtcblxuICAgIHJ1bGUuYWRkVGFyZ2V0KG5ldyB0YXJnZXRzLkxhbWJkYUZ1bmN0aW9uKGxhbWJkYUZuKSk7XG4gIH1cbn1cblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBMYW1iZGFDcm9uU3RhY2soYXBwLCAnTGFtYmRhQ3JvbkV4YW1wbGUnKTtcbmFwcC5zeW50aCgpO1xuIl19