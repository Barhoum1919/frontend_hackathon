import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiktokService {
  private apiUrl = 'https://your-tiktok-api.com';

  constructor(private http: HttpClient) {}

  getTrendingVideos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending`);
  }

  getVideoByUrl(videoUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/fetchVideo`, { url: videoUrl });
  }

  getVideosByHashtag(hashtag: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?hashtag=${hashtag}`);
  }
}
