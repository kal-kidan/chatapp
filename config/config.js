require('dotenv').config();
const Joi = require('joi')
const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().positive().default(3000),
}).unknown()

const {value: envVars, error} = envVarsSchema.prefs({errors: {label: "key"}}).
    validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV, 
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        options: {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      }, 
      jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: 10,
        emailVerificationExpirationDays: envVars.JWT_EMAIL_VERIFICATION_EXPIRATION_DAYS,
      },
      email: {
        smtp: {
          host: envVars.SMTP_HOST,
          port: envVars.SMTP_PORT,
          auth: {
            user: envVars.SMTP_USERNAME,
            pass: envVars.SMTP_PASSWORD,
          },
        },
        from: envVars.EMAIL_FROM,
        mailerKey: envVars.MAILERLITE_KEY,
        postmarkTransportKey: envVars.POSTMARK_TRANSPORT_KEY,
        groupId: envVars.GROUP_ID,
      },
}