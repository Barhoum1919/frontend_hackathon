import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiktokService {

  private apiUrl = 'http://localhost:8000';
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
  
  scrapeAndDownload(data: { search_type: string, search_query: string, max_videos: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/scrape-and-download/`, data);
  }
  getStatus(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-status/?id=${id}`);
  }
}
