import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { FamilyService } from '../../core/services/family.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  readonly authService = inject(AuthService);
  readonly familyService = inject(FamilyService);
}
