import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
import router from "@/router";

const route = useRouter();

const token = ref(localStorage.getItem("user_token") || "");

export function useAuth() {
  const usuarioDados = computed(() => {
    if (!token.value) return null;
    try {
      const decoded = jwtDecode<{ NomeUsuario: string; email: string; role: string }>(token.value);
      return decoded;
    } catch {
      return null;
    }
  });

  const usuarioNome = computed(() => usuarioDados.value?.NomeUsuario || "");
  const usuarioEmail = computed(() => usuarioDados.value?.email || "");

  const tipoUsuario = computed(() => {
    const roleId = usuarioDados.value?.role;
    if (roleId === "1") return "Admin";
    if (roleId === "2") return "Cliente";
    return "";
  });

  const estaLogado = computed(() => !!token.value);

  const login = (novoToken: string) => {
    localStorage.setItem("user_token", novoToken);
    token.value = novoToken;
  };

  const logout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_nome");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    token.value = "";
    router.push("/")
  };

  return {
    usuarioNome,
    usuarioEmail,
    tipoUsuario,
    estaLogado,
    login,
    logout,
  };
}
