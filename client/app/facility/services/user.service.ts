import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

import { BaseService } from '@app/core/services';
import { User } from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  protected readonly resource = 'users';

  create(_user: User): Observable<never> {
    return throwError(new Error('You may not create a user in this fashion'));
  }
}
