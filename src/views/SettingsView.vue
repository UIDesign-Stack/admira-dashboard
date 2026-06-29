<template>
  <main class="flex-1 overflow-y-auto px-4 lg:px-8 py-6 pb-6">

    <!-- Page Header -->
    <SettingsHeader />

    <!-- Body: Sidebar + Content -->
    <div class="flex flex-col lg:flex-row gap-4 mt-6">

      <!-- Sidebar -->
      <SettingsSidebar :active="activeTab" @change="activeTab = $event" />

      <!-- Content Panel -->
      <div class="flex-1 min-w-0">
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          mode="out-in"
        >
          <SettingsProfile        v-if="activeTab === 'Profile'"       key="profile"       />
          <SettingsSecurity       v-else-if="activeTab === 'Security'"      key="security"      />
          <SettingsNotifications  v-else-if="activeTab === 'Notifications'" key="notifications" />
          <SettingsAppearance     v-else-if="activeTab === 'Appearance'"    key="appearance"    />
          <SettingsBilling        v-else-if="activeTab === 'Billing'"       key="billing"       />
          <SettingsIntegrations   v-else-if="activeTab === 'Integrations'"  key="integrations"  />
          <SettingsApiKeys        v-else-if="activeTab === 'API Keys'"      key="apikeys"       />
          <SettingsTwoFactor      v-else-if="activeTab === 'Two-Factor Auth'" key="twofactor"   />
        </Transition>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import SettingsHeader        from '@/components/settings/SettingsHeader.vue'
import SettingsSidebar       from '@/components/settings/SettingsSidebar.vue'
import SettingsProfile       from '@/components/settings/SettingsProfile.vue'
import SettingsSecurity      from '@/components/settings/SettingsSecurity.vue'
import SettingsNotifications from '@/components/settings/SettingsNotifications.vue'
import SettingsAppearance    from '@/components/settings/SettingsAppearance.vue'
import SettingsBilling       from '@/components/settings/SettingsBilling.vue'
import SettingsIntegrations  from '@/components/settings/SettingsIntegrations.vue'
import SettingsApiKeys       from '@/components/settings/SettingsApiKeys.vue'
import SettingsTwoFactor     from '@/components/settings/SettingsTwoFactor.vue'

const activeTab = ref('Profile')
</script>