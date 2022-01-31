// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { CfnWorkGroup } from '@aws-cdk/aws-athena';
import { Bucket } from '@aws-cdk/aws-s3';
import { Construct, Stack } from '@aws-cdk/core';
import { NagSuppressions } from 'cdk-nag';
import { SingletonBucket } from './singleton-bucket';

/**
 * AthenaDefaultSetup Construct to automatically setup a new Amazon Athena Workgroup with proper configuration for out-of-the-box usage
 */

export class AthenaDefaultSetup extends Construct {

  public readonly resultBucket: Bucket;

  /**
   * Constructs a new instance of the AthenaDefaultSetup class
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {string} id the ID of the CDK Construct
   * @access public
   */

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Singleton Amazon S3 bucket for Amazon Athena Query logs
    this.resultBucket = SingletonBucket.getOrCreate(this, 'log');

    new CfnWorkGroup(this, 'athenaDefaultWorkgroup', {
      name: 'default',
      recursiveDeleteOption: true,
      workGroupConfiguration: {
        publishCloudWatchMetricsEnabled: false,
        resultConfiguration: {
          outputLocation: this.resultBucket.s3UrlForObject('athena-console-results'),
        },
      },
    });

    NagSuppressions.addResourceSuppressionsByPath(
      Stack.of(this),
      'athena-default-setup/athenaDefault/athenaDefaultWorkgroup',
      [
        {
          id: 'AwsSolutions-ATH1',
          reason: 'Not encrypting results, the user might have encryption in place, we do not want to change the KMS key',
        },
      ],
    );

  }
}
