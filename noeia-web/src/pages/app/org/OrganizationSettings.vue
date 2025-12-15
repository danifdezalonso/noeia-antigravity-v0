<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

const generalForm = ref({
  name: 'Noeia Clinic',
  email: 'contact@noeia.com',
  phone: '+34 93 123 45 67',
  address: 'Carrer de Balmes, 123, 08008 Barcelona'
})

const notificationSettings = ref({
  emailAlerts: true,
  smsAlerts: false,
  marketingEmails: false
})

const securitySettings = ref({
  twoFactor: true
})

function saveGeneral() {
  console.log('Saving general settings:', generalForm.value)
}

function saveNotifications() {
  console.log('Saving notification settings:', notificationSettings.value)
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in duration-500">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
      <p class="text-muted-foreground">Manage your organization's preferences.</p>
    </div>

    <Tabs default-value="general" class="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general" class="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
            <CardDescription>
              Update your organization's public information.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="name">Organization Name</Label>
              <Input id="name" v-model="generalForm.name" />
            </div>
            <div class="space-y-2">
              <Label for="email">Contact Email</Label>
              <Input id="email" type="email" v-model="generalForm.email" />
            </div>
            <div class="space-y-2">
              <Label for="phone">Phone Number</Label>
              <Input id="phone" type="tel" v-model="generalForm.phone" />
            </div>
            <div class="space-y-2">
              <Label for="address">Address</Label>
              <Input id="address" v-model="generalForm.address" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="saveGeneral">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" class="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive alerts and updates.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between space-x-2">
              <Label for="email-alerts" class="flex flex-col space-y-1">
                <span>Email Alerts</span>
                <span class="font-normal text-xs text-muted-foreground">Receive emails about new appointments and messages.</span>
              </Label>
              <Switch id="email-alerts" :checked="notificationSettings.emailAlerts" @update:checked="notificationSettings.emailAlerts = $event" />
            </div>
            <Separator />
            <div class="flex items-center justify-between space-x-2">
              <Label for="sms-alerts" class="flex flex-col space-y-1">
                <span>SMS Alerts</span>
                <span class="font-normal text-xs text-muted-foreground">Receive SMS notifications for urgent matters.</span>
              </Label>
              <Switch id="sms-alerts" :checked="notificationSettings.smsAlerts" @update:checked="notificationSettings.smsAlerts = $event" />
            </div>
            <Separator />
            <div class="flex items-center justify-between space-x-2">
              <Label for="marketing" class="flex flex-col space-y-1">
                <span>Marketing Emails</span>
                <span class="font-normal text-xs text-muted-foreground">Receive news and updates about Noeia features.</span>
              </Label>
              <Switch id="marketing" :checked="notificationSettings.marketingEmails" @update:checked="notificationSettings.marketingEmails = $event" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="saveNotifications">Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" class="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your security settings.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between space-x-2">
              <Label for="2fa" class="flex flex-col space-y-1">
                <span>Two-Factor Authentication</span>
                <span class="font-normal text-xs text-muted-foreground">Add an extra layer of security to your account.</span>
              </Label>
              <Switch id="2fa" :checked="securitySettings.twoFactor" @update:checked="securitySettings.twoFactor = $event" />
            </div>
            <Separator />
            <div class="space-y-2">
              <Label>Password</Label>
              <Button variant="outline" class="w-full sm:w-auto">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
