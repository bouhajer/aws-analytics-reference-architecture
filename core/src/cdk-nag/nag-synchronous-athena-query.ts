import {App, Aspects, Stack} from '@aws-cdk/core';
import { SynchronousAthenaQuery } from '../synchronous-athena-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AwsSolutionsChecks } from 'cdk-nag';

const mockApp = new App();

const synchronousAthenaStack = new Stack(mockApp, 'synchronous-athena-query');
// Instantiate a CrawlerStartWait custom resource
new SynchronousAthenaQuery(synchronousAthenaStack, 'SynchronousAthenaQueryTes', {
  statement: 'SELECT * FROM test.test;',
  resultPath: {
    bucketName: 'log',
    objectKey: 'query-result',
  },
});

Aspects.of(synchronousAthenaStack).add(new AwsSolutionsChecks({ verbose: true }));
