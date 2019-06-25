import { TestBed } from '@angular/core/testing';

import { ImageGetSetService } from './image-get-set.service';

describe('ImageGetSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageGetSetService = TestBed.get(ImageGetSetService);
    expect(service).toBeTruthy();
  });
});
