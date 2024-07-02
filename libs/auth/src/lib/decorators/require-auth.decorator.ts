import { SetMetadata } from '@nestjs/common';

export const REQUIRE_AUTH_KEY = '[REQUIRE_AUTH]';

export const RequireAuth = () => SetMetadata(REQUIRE_AUTH_KEY, true);
