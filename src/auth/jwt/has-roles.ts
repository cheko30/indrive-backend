import { SetMetadata } from "@nestjs/common";
import { JwtRole } from "./jwt-rol";

export const HasRoles = (...roles: JwtRole[]) => SetMetadata('roles', roles);