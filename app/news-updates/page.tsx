'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, ArrowUpRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { api, NewsArticle } from '@/lib/api';

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState({
    limit: '10',
    time_published: 'anytime',
    country: 'US',
    lang: 'en'
  });

  useEffect(() => {
    const savedNews = localStorage.getItem('newsData');
    const savedQuery = localStorage.getItem('searchQuery');
    const savedFilters = localStorage.getItem('newsFilters');
    const savedHasSearched = localStorage.getItem('hasSearched');

    if (savedNews) setNewsData(JSON.parse(savedNews));
    if (savedQuery) setSearchQuery(savedQuery);
    if (savedFilters) setFilters(JSON.parse(savedFilters));
    if (savedHasSearched) setHasSearched(JSON.parse(savedHasSearched));
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('newsData', JSON.stringify(newsData));
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('newsFilters', JSON.stringify(filters));
    localStorage.setItem('hasSearched', JSON.stringify(hasSearched));
  }, [newsData, searchQuery, filters, hasSearched, isInitialized]);

  const fetchData = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const news = await api.getNews(searchQuery, filters);
      setNewsData(news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">News Updates</h1>
        <p className="text-gray-400 mt-2">Find the latest news articles for your campaign research.</p>
      </div>

      <Card className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A]">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search news (e.g., Football, Technology, Politics)..."
                  className="pl-10 h-11 bg-[#1A1A1A] border-[#2A2A2A] focus:ring-orange-500 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading || !searchQuery.trim()}
                className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white font-medium"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search News'}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Filter className="h-4 w-4" />
                <span>Filters:</span>
              </div>
              
              <Select 
                value={filters.time_published} 
                onValueChange={(val) => setFilters(prev => ({ ...prev, time_published: val }))}
              >
                <SelectTrigger className="w-[140px] h-9 bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">Anytime</SelectItem>
                  <SelectItem value="24h">Past 24 hours</SelectItem>
                  <SelectItem value="7d">Past 7 days</SelectItem>
                  <SelectItem value="30d">Past 30 days</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.country} 
                onValueChange={(val) => setFilters(prev => ({ ...prev, country: val }))}
              >
                <SelectTrigger className="w-[140px] h-9 bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.lang} 
                onValueChange={(val) => setFilters(prev => ({ ...prev, lang: val }))}
              >
                <SelectTrigger className="w-[140px] h-9 bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.limit} 
                onValueChange={(val) => setFilters(prev => ({ ...prev, limit: val }))}
              >
                <SelectTrigger className="w-[140px] h-9 bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 results</SelectItem>
                  <SelectItem value="20">20 results</SelectItem>
                  <SelectItem value="50">50 results</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className={cn("transition-opacity duration-200", loading ? "opacity-50 pointer-events-none" : "opacity-100")}>
        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-8 border border-dashed border-[#2A2A2A] rounded-lg bg-[#111111]/40">
            <div className="bg-[#1A1A1A] p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No news to display</h3>
            <p className="text-gray-400 max-w-md">
              Enter a topic in the search bar above to find the latest news articles relevant to your campaign.
            </p>
          </div>
        ) : newsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-8 border border-dashed border-[#2A2A2A] rounded-lg bg-[#111111]/40">
            <div className="bg-[#1A1A1A] p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
            <p className="text-gray-400 max-w-md">
              We couldn't find any news articles matching your search. Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {newsData.map((article) => (
              <Card 
                key={article.article_id} 
                className="bg-[#111111]/80 backdrop-blur-sm border-[#2A2A2A] overflow-hidden hover:border-orange-500/50 transition-colors"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {(article.thumbnail_url || article.photo_url) && (
                      <div className="w-full sm:w-48 h-48 sm:h-auto relative shrink-0 bg-[#0A0A0A]">
                        <img 
                          src={article.thumbnail_url || article.photo_url} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {article.source_favicon_url && (
                            <img 
                              src={article.source_favicon_url} 
                              alt="" 
                              className="w-4 h-4 rounded-full"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }} 
                            />
                          )}
                          <span className="text-xs text-gray-400 font-medium">{article.source_name}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">
                            {new Date(article.published_datetime_utc).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <a 
                          href={article.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-white mb-2 hover:text-orange-500 transition-colors line-clamp-2 block"
                        >
                          {article.title}
                        </a>
                        
                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                          {article.snippet}
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <a 
                          href={article.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-orange-500 hover:text-orange-400 flex items-center gap-1 font-medium"
                        >
                          Read more <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
