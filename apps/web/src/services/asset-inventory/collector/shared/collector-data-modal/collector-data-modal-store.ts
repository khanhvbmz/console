import { defineStore } from 'pinia';

import type { CollectorModel, SecretModel, JobStatus } from '@/services/asset-inventory/collector/model';
import { ATTACHED_ACCOUNT_TYPE } from '@/services/asset-inventory/collector/shared/collector-data-modal/type';

export const useCollectorDataModalStore = defineStore('collector-data-modal', {
    state: () => ({
        // Required
        recentJob: {} as JobStatus, // Determine the theme-color of the p-button-modal, duration, status.
        selectedCollector: {} as CollectorModel, // This state is used for API.
        accountType: ATTACHED_ACCOUNT_TYPE.ALL, // In detail page, This state is used for account type.

        // Optional
        selectedSecret: {} as SecretModel, // In detail page, This state is used for API.
        secrets: [] as SecretModel[], // In detail page, This state is used for account count.
    }),
});
