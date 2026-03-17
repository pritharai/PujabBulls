import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    level: {
      type: String,
      default: "info",
      index: true,
    },
    domain: {
      type: String,
      default: "system",
      index: true,
    },
    eventType: {
      type: String,
      required: true,
      index: true,
    },
    requestId: {
      type: String,
      index: true,
    },
    route: String,
    method: String,
    actor: {
      role: String,
      email: String,
      ip: String,
      userAgent: String,
    },
    blog: {
      id: String,
      slug: String,
      title: String,
    },
    asset: {
      publicId: String,
      url: String,
      folder: String,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    versionKey: false,
  },
);

auditLogSchema.index({ domain: 1, eventType: 1, timestamp: -1 });
auditLogSchema.index({ "asset.publicId": 1, timestamp: -1 });
auditLogSchema.index({ "blog.id": 1, timestamp: -1 });

export default mongoose.model("AuditLog", auditLogSchema);
