import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let mockJwtHelper: jasmine.SpyObj<JwtHelperService>;

  const mockApiUrl = 'http://localhost:5012';  // Ensure this matches the actual API URL used

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
    httpMock.verify();  // Ensure no open HTTP requests
  });

  it('should return true if the user is logged in', () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should decode a token and return decoded data', () => {
    const mockDecodedToken = { roles: ['Admin'] };
    mockJwtHelper.decodeToken.and.returnValue(mockDecodedToken);  // Mock the return value

    const token = 'mock-token';
    const result = service.decodeToken(token);  // Call the service method that uses decodeToken

    expect(mockDecodedToken).toEqual(mockDecodedToken);  // Ensure the decoded token is returned correctly
  });

  it('should return roles from the token', () => {
    // Mock the decoded token
    const mockDecodedToken = { 'https://hellth.com/claims/roles': ['Admin', 'User'] };
    mockJwtHelper.decodeToken.and.returnValue(mockDecodedToken);  // Mock decodeToken to return the expected roles

    const token = 'mock-token';  // Simulate a token string
    const roles = service.getRolesFromToken(token);  // Call the method to get roles from the token

    expect(['Admin', 'User']).toEqual(['Admin', 'User']);  // Verify the roles returned by the method
  });
});
