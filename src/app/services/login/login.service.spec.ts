import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let mockJwtHelper: jasmine.SpyObj<JwtHelperService>;

  const mockApiUrl = 'http://localhost:5012';

  beforeEach(() => {
    mockJwtHelper = jasmine.createSpyObj('JwtHelperService', ['decodeToken']);
    mockJwtHelper.decodeToken.and.returnValue({ roles: ['Admin'] });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        { provide: 'API_URL', useValue: mockApiUrl },
        { provide: JwtHelperService, useValue: mockJwtHelper }
      ]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return true if the user is logged in', () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should decode a token and return decoded data', () => {
    const mockDecodedToken = { roles: ['Admin'] };
    mockJwtHelper.decodeToken.and.returnValue(mockDecodedToken);

    const token = 'mock-token';
    const result = service.decodeToken(token);

    expect(mockDecodedToken).toEqual(mockDecodedToken);
  });

  it('should return roles from the token', () => {
    const mockDecodedToken = { 'https://hellth.com/claims/roles': ['Admin', 'User'] };
    mockJwtHelper.decodeToken.and.returnValue(mockDecodedToken);

    const token = 'mock-token';
    const roles = service.getRolesFromToken(token);

    expect(['Admin', 'User']).toEqual(['Admin', 'User']);
  });
});
