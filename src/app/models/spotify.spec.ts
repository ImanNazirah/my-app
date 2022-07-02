import { Spotify } from './spotify';

describe('Spotify', () => {
  it('should create an instance', () => {
    expect(new Spotify()).toBeTruthy();
  });
});
