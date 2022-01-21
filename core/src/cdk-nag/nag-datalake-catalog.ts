import { Aspects, Stack } from '@aws-cdk/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AwsSolutionsChecks } from 'cdk-nag';
import { DataLakeCatalog } from '../data-lake-catalog';

const dataLakeCatalogStack = new Stack();

// Instantiate DataLakeCatalog Construct
new DataLakeCatalog(dataLakeCatalogStack, 'dataLakeCatalog');

Aspects.of(dataLakeCatalogStack).add(new AwsSolutionsChecks({ verbose: true }));
