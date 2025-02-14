import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { TiktokService } from '../service/tiktok.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user: any = null;

  videoUrl: string = '';
  hashtag: string = '';
  username:string=''
  errorMessage: string = '';
  constructor(private userService: UserService, private tiktokService: TiktokService) {}
  uploadedVideos: any[] = [
    {
      id: '1',
      title: 'Product Promotion 1',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      customerName: 'Customer A',
      views: 1000,
      likes: 150,
      comments: 25,
      shares: 10,
      uploadedAt: '2025-02-01T12:00:00Z'
    },
    {
      id: '2',
      title: 'Product Promotion 2',
      videoUrl: 'https://www.youtube.com/embed/xyz123',
      customerName: 'Customer B',
      views: 2000,
      likes: 250,
      comments: 40,
      shares: 20,
      uploadedAt: '2025-02-02T12:00:00Z'
    },
    {
      id: '3',
      title: 'Product Promotion 3',
      videoUrl: 'https://www.youtube.com/embed/xyz123',
      customerName: 'Customer B',
      views: 2000,
      likes: 250,
      comments: 40,
      shares: 20,
      uploadedAt: '2025-02-02T12:00:00Z'
    }
  ];
  trendingVideos= [
    {
      id: '1',
      title: 'Trend Video  1',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      customerName: 'Customer A',
      views: 1000,
      likes: 150,
      comments: 25,
      shares: 10,
      uploadedAt: '2025-02-01T12:00:00Z'
    },
    {
      id: '2',
      title: 'Trend Video 2',
      videoUrl: 'https://www.youtube.com/embed/xyz123',
      customerName: 'Customer B',
      views: 2000,
      likes: 250,
      comments: 40,
      shares: 20,
      uploadedAt: '2025-02-02T12:00:00Z'
    },
    {
      id: '2',
      title: 'Trend Video 3',
      videoUrl: 'https://www.youtube.com/embed/xyz123',
      customerName: 'Customer B',
      views: 2000,
      likes: 250,
      comments: 40,
      shares: 20,
      uploadedAt: '2025-02-02T12:00:00Z'
    }
  ];
  ngOnInit(): void {
    this.loadUserData();
    this.fetchTrendingVideos();
  }

  loadUserData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUser(token).subscribe({
        next: (response: any) => {
          if (response.userData && response.userData.length > 0) {
            this.user = response.userData[0]; 
          } else {
            this.errorMessage = 'No user data found.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Failed to load user details.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'User not authenticated.';
    }
  }

  fetchTrendingVideos(): void {
    this.tiktokService.getTrendingVideos().subscribe(
      (videos) => {
        this.trendingVideos = videos.map((video: any) => ({
          title: video.title || 'Trending Video',
          embedUrl: `https://www.tiktok.com/embed/${video.id}`
        }));
      },
      (error) => {
        console.error('Error fetching TikTok videos', error);
      }
    );
  }

  searchVideos(): void {
    if (this.videoUrl) {
      this.tiktokService.getVideoByUrl(this.videoUrl).subscribe(
       
        (error) => console.error('Error fetching video', error)
      );
    } else if (this.hashtag) {
      this.tiktokService.getVideosByHashtag(this.hashtag).subscribe(
        (videos) => {
          this.trendingVideos = videos.map((video: any) => ({
            title: video.title || 'Hashtag Video',
            embedUrl: `https://www.tiktok.com/embed/${video.id}`
          }));
        },
        (error) => console.error('Error fetching hashtag videos', error)
      );
    }
  }
    // Call the scrape API
      searchType: string = '';
      searchQuery: string = '';
      maxVideos: number = 10;
      taskId: string = '';
      status: string = '';
    onScrape() {
      const data = {
        search_type: this.searchType,
        search_query: this.searchQuery,
        max_videos: this.maxVideos
      };
  
      this.tiktokService.scrapeAndDownload(data).subscribe(response => {
        this.taskId = response.id;
      });
    }
  
    // Call the status API
    onGetStatus() {
      this.tiktokService.getStatus(this.taskId).subscribe(response => {
        this.status = response.status;
      });
    }
}
