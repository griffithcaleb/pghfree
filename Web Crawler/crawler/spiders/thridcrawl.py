import scrapy

class ThirdSpider(scrapy.Spider):
    name = "thirdCrawler"

    def start_requests(self):
        urls = [
            'https://alleghenycounty.us/special-events/summer-concert-series.aspx',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for row in response.xpath('//*[@class="table table-striped"]//tbody//tr'):
            yield {
                'data' :row.xpath('td//text()[1]').extract()}
