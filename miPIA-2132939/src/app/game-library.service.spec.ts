import { TestBed } from '@angular/core/testing';

import { GameLibraryService } from './game-library.service';

describe('GameLibraryService', () => {
  let service: GameLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
