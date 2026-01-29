<template>
  <div class="role-checker">
    <div class="container">
      <h1>User Role Checker</h1>

      <div v-if="!isAuthenticated" class="card">
        <p>Please sign in to check your role.</p>
        <router-link to="/auth" class="btn-primary">Sign In</router-link>
      </div>

      <div v-else class="card">
        <h2>Current User Information</h2>

        <div class="info-grid">
          <div class="info-item">
            <strong>Email:</strong>
            <span>{{ user?.email }}</span>
          </div>

          <div class="info-item">
            <strong>User ID:</strong>
            <code>{{ user?.id }}</code>
          </div>

          <div class="info-item">
            <strong>Current Role:</strong>
            <span class="role-badge" :class="`role-${user?.role || 'none'}`">
              {{ user?.role || 'No role set' }}
            </span>
          </div>

          <div class="info-item">
            <strong>Username:</strong>
            <span>{{ user?.username || 'Not set' }}</span>
          </div>
        </div>

        <div class="instructions">
          <h3>To Set Admin Role:</h3>
          <ol>
            <li>Open PocketBase Admin UI: <a href="http://127.0.0.1:8090/_/" target="_blank">http://127.0.0.1:8090/_/</a></li>
            <li>Sign in with your admin credentials</li>
            <li>Go to Collections → <code>users</code></li>
            <li>Find your user record (ID: <code>{{ user?.id }}</code>)</li>
            <li>Edit the record and set the <code>role</code> field to: <code>admin</code></li>
            <li>Save and refresh this page</li>
          </ol>
        </div>

        <div class="quick-links">
          <h3>Quick Links:</h3>
          <div class="link-grid">
            <router-link to="/profile" class="btn-secondary">Profile</router-link>
            <router-link to="/admin" class="btn-primary">Try Admin Dashboard</router-link>
            <router-link to="/bkt-tester" class="btn-secondary">BKT Tester</router-link>
          </div>
        </div>

        <div class="debug-info">
          <h3>Full User Object:</h3>
          <pre>{{ JSON.stringify(user, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const { user, isAuthenticated } = useAuth()
</script>

<style scoped>
.role-checker {
  min-height: 100vh;
  padding: 2rem;
  background: var(--bg-main);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.card {
  background: var(--bg-card);
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.card h2 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
}

.card h3 {
  margin: 1.5rem 0 1rem 0;
  color: var(--text-primary);
  font-size: 1.125rem;
}

.info-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-main);
  border-radius: 0.375rem;
}

.info-item strong {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.info-item span, .info-item code {
  color: var(--text-primary);
  font-weight: 500;
}

.info-item code {
  background: var(--bg-card);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875rem;
}

.role-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.role-admin {
  background: #fce7f3;
  color: #831843;
}

.role-instructor {
  background: #e0e7ff;
  color: #3730a3;
}

.role-student {
  background: #dbeafe;
  color: #1e40af;
}

.role-none {
  background: #f3f4f6;
  color: #6b7280;
}

.instructions {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 1.5rem;
  border-radius: 0.375rem;
  margin-bottom: 2rem;
}

.instructions h3 {
  margin-top: 0;
  color: #92400e;
}

.instructions ol {
  margin: 0;
  padding-left: 1.5rem;
  color: #78350f;
}

.instructions li {
  margin-bottom: 0.5rem;
}

.instructions a {
  color: #1d4ed8;
  text-decoration: underline;
}

.instructions code {
  background: #fffbeb;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #92400e;
}

.quick-links {
  margin-bottom: 2rem;
}

.link-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.debug-info {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
}

.debug-info h3 {
  margin-top: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.debug-info pre {
  background: var(--bg-main);
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  font-size: 0.8125rem;
  color: var(--text-primary);
}

.btn-primary, .btn-secondary {
  display: inline-block;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}
</style>
