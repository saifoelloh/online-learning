# Installation Instruction

1. change `.env.example` to `.env`, and also don't forget to change the variable inside of it
2. install all the dependencies with `npm` or `yarn`
3. after installation go to `node_modules/@types/express/index.d.ts` and add this code down bellow:
    ```typescript
    declare global {
        namespace Express {
            export interface Request {
                locals: {
                    [key: string]: any
                }
            }
        }
    } 
    ```
    this code will `override` the `Request type` from expressJS, so we can pass our variable through the other middleware 
4. execute `ssh-keygen signature -t ecdsa -b 256` to make our `public` and `private` key
5. execute `yarn sequelize db:migrate` to migrate our app
6. start our apps with `yarn start:nodemon` or `npm start:nodemon` 