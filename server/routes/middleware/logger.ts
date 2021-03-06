import { Request, Response, NextFunction } from '@server/interfaces';
import { isObject, not } from '@server/utils';
import { PRODUCTION } from '@server/config';

import chalk from 'chalk';

export function routeLogger(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  if (not(PRODUCTION)) {
    const keys = [
      'method',
      'hostname',
      'ip',
      'body',
      'cookies',
      'params',
      'path',
      'protocol',
      'route',
    ];

    keys.forEach(key => {
      const data: string | object = request[key];

      if (data) {
        if (isObject(data)) {
          if (Object.keys(data).length) {
            console.log(
              chalk.red(`The request ${key} object has these properties: `)
            );

            for (const [k, v] of Object.entries(data)) {
              console.log(chalk.blue(`\t${k} => ${v}`));
            }
          }
        } else {
          console.log(chalk.gray(`The request ${key} is ${data}`));
        }
      }
    });
  }

  next();
}
