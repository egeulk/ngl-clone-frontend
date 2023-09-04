import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  console.log("AuthGuard Aktif...")
  if (loginService.isAuthenticated()) {
    if (state.url=== '/login' || state.url === '/') {
      router.navigate(['/dashboard'])
    }
    return true;
  }
  else if (state.url==='/') return true;
  else if (state.url !== '/login') { 
    console.log("Otantike degil ve login'e yonlendirilecek")
    router.navigate(['/login']);
    return false;
  }
  console.log("Otantike degil ve logindesin");
  return true;
};
