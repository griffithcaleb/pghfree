import scrapy


class EventbriteSpider(scrapy.Spider):
    name = "firstCrawler"

    def start_requests(self):
        urls = [
            'https://www.eventbrite.com/d/pa--pittsburgh/free--music--events/free/?page=1'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
    	for quote in response.css('.search-event-card-wrapper'):
            yield {
                'title': quote.css('.card-text--truncated__three::text').extract_first(),
				'time': quote.css('.eds-l-mar-top-1::text').extract_first(),
                'location': quote.css('.card-text--truncated__one::text').extract(),
                'findOutMore': quote.css('.eds-media-card-content__primary-content a::attr(href)').extract(),
                'eventPhoto': quote.css('.eds-media-card-content__image').xpath('@src').extract(),
              }
