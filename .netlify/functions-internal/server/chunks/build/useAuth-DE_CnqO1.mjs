import { u as useState, $ as $fetch, n as navigateTo } from '../virtual/entry.mjs';
import { ref, computed } from 'vue';

// composables/useAuth.ts
var useAuth = () => {
	const user = useState("auth:user", () => null);
	const loading = ref(false);
	const fetchMe = async () => {
		try {
			const res = await $fetch("/api/me");
			user.value = res.user;
			return res.user;
		} catch {
			user.value = null;
			return null;
		}
	};
	const login = async (email, password) => {
		loading.value = true;
		try {
			const res = await $fetch("/api/auth/login", {
				method: "POST",
				body: {
					email,
					password
				}
			});
			user.value = res.user;
			return res.user;
		} finally {
			loading.value = false;
		}
	};
	const register = async (payload) => {
		loading.value = true;
		try {
			const res = await $fetch("/api/auth/register", {
				method: "POST",
				body: payload
			});
			user.value = res.user;
			return res.user;
		} finally {
			loading.value = false;
		}
	};
	const logout = async () => {
		await $fetch("/api/auth/logout", { method: "POST" });
		user.value = null;
		await navigateTo("/login");
	};
	const isAdmin = computed(() => user.value?.peran === "admin");
	return {
		user,
		loading,
		isAdmin,
		isPengurus: computed(() => user.value?.peran === "pengurus" || isAdmin.value),
		isLoggedIn: computed(() => !!user.value),
		fetchMe,
		login,
		register,
		logout
	};
};

export { useAuth as u };
//# sourceMappingURL=useAuth-DE_CnqO1.mjs.map
