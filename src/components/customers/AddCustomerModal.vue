<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="show"
            class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center">
                  <UserPlusIcon class="w-4 h-4 text-brand-500" />
                </div>
                <div>
                  <h2 class="text-sm font-bold text-gray-900">Add Customer</h2>
                  <p class="text-[10px] text-gray-400">Fill in the customer details below</p>
                </div>
              </div>
              <button
                @click="$emit('close')"
                class="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <XMarkIcon class="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <!-- Form -->
            <div class="px-6 py-5 space-y-4">

              <!-- Full Name -->
              <div>
                <label class="text-xs font-semibold text-gray-600 mb-1.5 block">Full Name</label>
                <div class="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:border-brand-300 focus-within:bg-white transition-all">
                  <UserIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="e.g. John Doe"
                    class="flex-1 text-xs text-gray-700 bg-transparent outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="text-xs font-semibold text-gray-600 mb-1.5 block">Email Address</label>
                <div class="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:border-brand-300 focus-within:bg-white transition-all">
                  <EnvelopeIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="e.g. john@email.com"
                    class="flex-1 text-xs text-gray-700 bg-transparent outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              <!-- Phone -->
              <div>
                <label class="text-xs font-semibold text-gray-600 mb-1.5 block">Phone Number</label>
                <div class="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:border-brand-300 focus-within:bg-white transition-all">
                  <PhoneIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="e.g. 08123456789"
                    class="flex-1 text-xs text-gray-700 bg-transparent outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              <!-- City + Status row -->
              <div class="grid grid-cols-2 gap-3">
                <!-- City -->
                <div>
                  <label class="text-xs font-semibold text-gray-600 mb-1.5 block">City</label>
                  <div class="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 focus-within:border-brand-300 focus-within:bg-white transition-all">
                    <MapPinIcon class="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      v-model="form.city"
                      type="text"
                      placeholder="e.g. Jakarta"
                      class="flex-1 text-xs text-gray-700 bg-transparent outline-none placeholder-gray-400 min-w-0"
                    />
                  </div>
                </div>

                <!-- Status -->
                <div>
                  <label class="text-xs font-semibold text-gray-600 mb-1.5 block">Status</label>
                  <select
                    v-model="form.status"
                    class="w-full text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-brand-300 focus:bg-white transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="text-xs font-semibold text-gray-600 mb-1.5 block">Notes <span class="text-gray-400 font-normal">(optional)</span></label>
                <textarea
                  v-model="form.notes"
                  rows="3"
                  placeholder="Any additional notes about this customer..."
                  class="w-full text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-brand-300 focus:bg-white transition-all resize-none placeholder-gray-400"
                ></textarea>
              </div>

            </div>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                @click="$emit('close')"
                class="px-4 py-2 text-xs font-semibold text-gray-500 bg-white border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                @click="handleSubmit"
                class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-700 rounded-xl hover:opacity-90 transition-opacity"
              >
                <UserPlusIcon class="w-3.5 h-3.5" />
                Add Customer
              </button>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import {
  UserPlusIcon,
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'

defineProps({ show: Boolean })
const emit = defineEmits(['close'])

const form = ref({
  name:   '',
  email:  '',
  phone:  '',
  city:   '',
  status: 'Active',
  notes:  '',
})

function handleSubmit() {
  // Validasi simpel
  if (!form.value.name || !form.value.email) return

  // Reset form & tutup modal
  form.value = { name: '', email: '', phone: '', city: '', status: 'Active', notes: '' }
  emit('close')
}
</script>