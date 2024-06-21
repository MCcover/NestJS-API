<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<h1 align="center">
  NEST-JS API TEMPLATE
</h1>

## Description
This is a template of an API developed in Nest-JS that uses Supabase to handle the registration and authentication of the users. Additionally, it uses Supabase's storage to store the RSA keys for use in the API.

To start developing using this template, it is necessary to:
- Have Node.js, pnpm, and Nest CLI installed.
- Have a project in Supabase.

## Configuration
It is necessary to establish some basic configurations before starting with the development. The environment variables must be defined in an `.env` file. To make this task easier, we already provide an `.env.template` file which indicates all the necessary variables to define in the `.env` file.

Once the environment variables are set, at any time if you want to have access to their values, it is not necessary to use `process.env.{VARIABLE_NAME}`. Instead, the `config` folder already provides a handle to the environment variables. Accessing their values is as simple as running `Environment.Instance.{VARIABLE_NAME}`.

## Features
The template already has: 
- A console logging middleware configured.
- A validation error handling pipe.
- A decryption pipe
- A decorator to indicate which properties of a DTO are encrypted so that the decryption pipe can decrypt the content.
- An interceptor to set the responses of the controllers.
- An environment variable handler.
- An authentication and authorization guard in which you can indicate a list of possible permissions that the user must have to be able to execute the request (having only one is considered valid).
- Predefined controller responses: SuccessResponse and ErrorResponse.

## License

NEST-JS API TEMPLATE is [MIT licensed](LICENSE).
</br>
</br>
</br>
