import { TestBed } from '@angular/core/testing';

import { ModalControllerService } from './modal-controller.service';

describe('ModalControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalControllerService = TestBed.get(ModalControllerService);
    expect(service).toBeTruthy();
  });
});
