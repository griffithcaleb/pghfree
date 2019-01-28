import scrapy


class PghCulturalTrustSpider(scrapy.Spider):
    name = "thirdCrawler"

    def start_requests(self):
        urls = [
            'https://www.post-gazette.com/ae/music/2018/05/09/Free-concerts-Pittsburgh-Three-Rivers-Arts-Festival-Hartwood-Acres-South-Park-Jazzlive-WYEP-Summersounds-Night-Market-Frick-Rivers-Casino/stories/201805090145'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
    	for quote in response.css('.pgevoke-contentarea-body-text'):
            yield {
                'title': quote.css('p').extract_first(),}
