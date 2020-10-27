/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { ClientFunction } from "testcafe";

const mock = ClientFunction(() => {
  sessionStorage.setItem("sendBeaconCallCount", 0);
  const nativeSendBeacon = window.navigator.sendBeacon.bind(window.navigator);
  window.navigator.sendBeacon = (...args) => {
    const sendBeaconCallCount = Number(
      sessionStorage.getItem("sendBeaconCallCount")
    );
    sessionStorage.setItem("sendBeaconCallCount", sendBeaconCallCount + 1);
    return nativeSendBeacon(...args);
  };
});

const getCallCount = ClientFunction(() => {
  return Number(sessionStorage.getItem("sendBeaconCallCount"));
});

/**
 * Mocks and calls through to the native sendBeacon API. Useful for
 * determining whether sendBeacon was used to make a network request.
 */
export default {
  mock,
  getCallCount
};