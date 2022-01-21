import { Aspects, Stack } from '@aws-cdk/core';
import { SynchronousCrawler } from '../synchronous-crawler';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AwsSolutionsChecks } from 'cdk-nag';

const crawlerStartWaitStack = new Stack();
// Instantiate a CrawlerStartWait custom resource
new SynchronousCrawler(crawlerStartWaitStack, 'CrawlerStartWaitTest', {
  crawlerName: 'test-crawler',
});

Aspects.of(crawlerStartWaitStack).add(new AwsSolutionsChecks({ verbose: true }));
