<?php

// app/Http/Controllers/PopularityController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class PopularityController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Popularity', ['data' => []]);
    }

    public function check(Request $request)
    {
        $artist = $request->input('artist');
        $data = $this->fetchPopularityData($artist);

        return response()->json($data);
    }

    private function fetchPopularityData($artist)
    {
        $googleData = $this->fetchGoogleSearchResults($artist);
        $youtubeData = $this->fetchYouTubeMetrics($artist);

        $twitterData = $this->fetchTwitterMetrics($artist);
        $facebookInstagramData = $this->fetchFacebookInstagramMetrics($artist);
        $tiktokData = $this->fetchTikTokMetrics($artist);
        $spotifyData = $this->fetchSpotifyMetrics($artist);

        return [
            'google' => $googleData,
            'youtube' => $youtubeData,

            'twitter' => $twitterData,
            'facebook' => $facebookInstagramData['facebook'],
            'instagram' => $facebookInstagramData['instagram'],
            'tiktok' => $tiktokData,
            'spotify' => $spotifyData,
        ];
    }

    // Implementações das funções fetchGoogleSearchResults e fetchTwitterMetrics
    private function fetchGoogleSearchResults($artist)
    {
        $apiKey = env('GOOGLE_API_KEY');
        $searchEngineId = env('GOOGLE_SEARCH_ENGINE_ID');
        $query = urlencode($artist);
        $url = "https://www.googleapis.com/customsearch/v1?q={$query}&key={$apiKey}&cx={$searchEngineId}";

        $response = Http::get($url);

        return $response->json();
    }

    private function fetchYouTubeMetrics($artist)
    {
        $apiKey = env('YOUTUBE_API_KEY');
        $query = urlencode($artist);
        $url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q={$query}&key={$apiKey}&type=video";

        $response = Http::get($url);

        return $response->json();
    }

    private function fetchTwitterMetrics($artist)
    {
        $bearerToken = env('TWITTER_BEARER_TOKEN');

        //'https://api.twitter.com/2/tweets/search/recent?query={$artist}&tweet.fields=public_metrics&expansions=author_id&user.fields=description'

        $url = "https://api.twitter.com/2/tweets/search/recent?query={$artist}&tweet.fields=public_metrics&expansions=author_id&user.fields=description";

        $response = Http::withHeaders([
            'Authorization' => "Bearer {$bearerToken}",
        ])->get($url);

        return $response->json();
    }

    private function fetchFacebookInstagramMetrics($artist)
    {
        $accessToken = env('FACEBOOK_ACCESS_TOKEN');
        $appSecret = env('FACEBOOK_APP_SECRET');
        $appSecretProof = hash_hmac('sha256', $accessToken, $appSecret);

        $facebookUrl = "https://graph.facebook.com/v20.0/me?fields=id%2Cname&access_token={$accessToken}";
        $instagramUrl = "https://graph.facebook.com/v20.0/{instagram_business_account_id}?fields=media.limit(5){caption,like_count,timestamp}&access_token={$accessToken}";

        $facebookResponse = Http::get($facebookUrl);
        $instagramResponse = Http::get($instagramUrl);

        return [
            'facebook' => $facebookResponse->json(),
            'instagram' => $instagramResponse->json()
        ];
    }

    private function fetchTikTokMetrics($artist)
    {
        $accessToken = env('TIKTOK_ACCESS_TOKEN');
        $tiktokUrl = "https://open-api.tiktok.com/analytics/data?metric_name=video_engagement&access_token={$accessToken}";

        $response = Http::get($tiktokUrl);

        return $response->json();
    }

    private function fetchSpotifyMetrics($artist)
    {
        $clientId = env('SPOTIFY_CLIENT_ID');
        $clientSecret = env('SPOTIFY_CLIENT_SECRET');
        $tokenUrl = "https://accounts.spotify.com/api/token";

        // Get access token
        $response = Http::asForm()->withBasicAuth($clientId, $clientSecret)->post($tokenUrl, [
            'grant_type' => 'client_credentials'
        ]);

        $accessToken = $response->json()['access_token'];

        // Search for artist
        $artistUrl = "https://api.spotify.com/v1/search?q={$artist}&type=artist";
        $artistResponse = Http::withHeaders([
            'Authorization' => "Bearer {$accessToken}"
        ])->get($artistUrl);

        return $artistResponse->json();
    }
}
