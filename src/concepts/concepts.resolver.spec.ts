import { Test, TestingModule } from '@nestjs/testing';
import { ConceptsResolver } from './concepts.resolver.js';

describe('ConceptsResolver', () => {
  let resolver: ConceptsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConceptsResolver],
    }).compile();

    resolver = module.get<ConceptsResolver>(ConceptsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
