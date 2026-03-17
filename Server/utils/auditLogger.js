import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import AuditLog from "../models/AuditLog.js";

const logsDir = path.join(process.cwd(), "logs");
const auditLogPath = path.join(logsDir, "image-audit.log");

function normalizeIp(ipAddress) {
  if (!ipAddress) return null;

  if (ipAddress.startsWith("::ffff:")) {
    return ipAddress.slice(7);
  }

  return ipAddress;
}

export function getActorFromRequest(req) {
  return {
    role: req?.admin?.role || "anonymous",
    email: req?.admin?.email || null,
    ip: normalizeIp(req?.ip || req?.socket?.remoteAddress),
    userAgent: req?.headers?.["user-agent"] || null,
  };
}

export async function writeAuditLog({
  level = "info",
  domain = "system",
  eventType,
  req,
  blog,
  asset,
  details = {},
}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    domain,
    eventType,
    requestId: req?.requestId || null,
    method: req?.method || null,
    route: req?.originalUrl || req?.url || null,
    actor: getActorFromRequest(req),
    blog: blog || null,
    asset: asset || null,
    details,
  };

  const serialized = JSON.stringify(payload);
  const consoleMethod = level === "error" ? console.error : console.log;
  consoleMethod(serialized);

  try {
    await fs.mkdir(logsDir, { recursive: true });
    await fs.appendFile(auditLogPath, `${serialized}\n`, "utf8");
  } catch (error) {
    console.error("Failed to write audit log file", error);
  }

  if (mongoose.connection.readyState === 1) {
    AuditLog.create(payload).catch((error) => {
      console.error("Failed to persist audit log", error);
    });
  }

  return payload;
}
