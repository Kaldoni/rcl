from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import verify_password, create_access_token, hash_password, get_current_admin
from app.models.user import User
from app.schemas.schemas import TokenResponse, LoginRequest
from app.core.config import settings

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is deactivated")

    token = create_access_token({"sub": user.email})
    return TokenResponse(
        access_token=token,
        user_email=user.email,
        user_name=user.full_name,
    )


@router.post("/seed-admin", include_in_schema=False)
async def seed_admin(secret: str, db: AsyncSession = Depends(get_db)):
    """One-time endpoint to create the default admin. Secured by a secret."""
    seed_secret = getattr(settings, "ADMIN_SEED_SECRET", "default-insecure-secret")
    if secret != seed_secret:
        raise HTTPException(status_code=403, detail="Invalid seed secret")

    result = await db.execute(select(User).where(User.email == settings.ADMIN_EMAIL_DEFAULT))
    existing = result.scalar_one_or_none()
    if existing:
        return {"message": "Admin already exists"}

    admin = User(
        email=settings.ADMIN_EMAIL_DEFAULT,
        hashed_password=hash_password(settings.ADMIN_PASSWORD_DEFAULT),
        full_name="Site Administrator",
        is_active=True,
        is_admin=True,
    )
    db.add(admin)
    await db.commit()
    return {"message": "Admin account created", "email": settings.ADMIN_EMAIL_DEFAULT}
