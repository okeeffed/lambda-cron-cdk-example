"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("@aws-cdk/aws-events");
const targets = require("@aws-cdk/aws-events-targets");
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/core");
require('dotenv').config();
class LambdaCronStack extends cdk.Stack {
    constructor(app, id) {
        super(app, id);
        const lambdaFn = new lambda.Function(this, 'Singleton', {
            code: lambda.Code.asset('resources'),
            handler: 'slack-message.handler',
            timeout: cdk.Duration.seconds(300),
            runtime: lambda.Runtime.NODEJS_12_X,
            environment: {
                SLACK_CHANNEL: process.env.SLACK_CHANNEL,
            },
        });
        // Run every day at 6PM UTC
        // See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
        const rule = new events.Rule(this, 'Rule', {
            schedule: events.Schedule.expression('cron(0/5 * ? * * *)'),
        });
        rule.addTarget(new targets.LambdaFunction(lambdaFn));
    }
}
exports.LambdaCronStack = LambdaCronStack;
const app = new cdk.App();
new LambdaCronStack(app, 'LambdaCronExample');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUErQztBQUMvQyx1REFBd0Q7QUFDeEQsOENBQStDO0FBQy9DLHFDQUFzQztBQUV0QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFM0IsTUFBYSxlQUFnQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzVDLFlBQVksR0FBWSxFQUFFLEVBQVU7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVmLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3RELElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDcEMsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsV0FBVyxFQUFFO2dCQUNYLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQXVCO2FBQ25EO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLHVHQUF1RztRQUN2RyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUN6QyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUM7U0FDNUQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUF0QkQsMENBc0JDO0FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxlQUFlLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDOUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV2ZW50cyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1ldmVudHMnKTtcbmltcG9ydCB0YXJnZXRzID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWV2ZW50cy10YXJnZXRzJyk7XG5pbXBvcnQgbGFtYmRhID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWxhbWJkYScpO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcblxucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbmV4cG9ydCBjbGFzcyBMYW1iZGFDcm9uU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihhcHA6IGNkay5BcHAsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhcHAsIGlkKTtcblxuICAgIGNvbnN0IGxhbWJkYUZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnU2luZ2xldG9uJywge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuYXNzZXQoJ3Jlc291cmNlcycpLFxuICAgICAgaGFuZGxlcjogJ3NsYWNrLW1lc3NhZ2UuaGFuZGxlcicsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBTTEFDS19DSEFOTkVMOiBwcm9jZXNzLmVudi5TTEFDS19DSEFOTkVMIGFzIHN0cmluZyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBSdW4gZXZlcnkgZGF5IGF0IDZQTSBVVENcbiAgICAvLyBTZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2xhbWJkYS9sYXRlc3QvZGcvdHV0b3JpYWwtc2NoZWR1bGVkLWV2ZW50cy1zY2hlZHVsZS1leHByZXNzaW9ucy5odG1sXG4gICAgY29uc3QgcnVsZSA9IG5ldyBldmVudHMuUnVsZSh0aGlzLCAnUnVsZScsIHtcbiAgICAgIHNjaGVkdWxlOiBldmVudHMuU2NoZWR1bGUuZXhwcmVzc2lvbignY3JvbigwLzUgKiA/ICogKiAqKScpLFxuICAgIH0pO1xuXG4gICAgcnVsZS5hZGRUYXJnZXQobmV3IHRhcmdldHMuTGFtYmRhRnVuY3Rpb24obGFtYmRhRm4pKTtcbiAgfVxufVxuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xubmV3IExhbWJkYUNyb25TdGFjayhhcHAsICdMYW1iZGFDcm9uRXhhbXBsZScpO1xuYXBwLnN5bnRoKCk7XG4iXX0=