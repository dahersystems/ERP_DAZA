/**
 * Constantes compartilhadas para métodos de pagamento.
 * Arquivo separado — sem "use server" — para poder ser importado
 * tanto em server actions quanto em client components.
 */

export const PAYMENT_LABELS: Record<string, string> = {
  PIX: "PIX",
  CARTAO_CREDITO: "Cartão de Crédito",
  CARTAO_DEBITO: "Cartão de Débito",
  DINHEIRO: "Dinheiro",
};

export const PAYMENT_COLORS: Record<string, string> = {
  PIX: "#FF8C00",
  CARTAO_CREDITO: "#3B82F6",
  CARTAO_DEBITO: "#10B981",
  DINHEIRO: "#8B5CF6",
};
