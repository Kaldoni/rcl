from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.content import ContactSubmission
from app.schemas.schemas import ContactCreate

router = APIRouter()

@router.post("", status_code=201)
async def submit_contact(data: ContactCreate, db: AsyncSession = Depends(get_db)):
    submission = ContactSubmission(**data.model_dump())
    db.add(submission)
    await db.commit()
    await db.refresh(submission)

    # TODO: Send email notification via SendGrid
    # from app.core.email import send_contact_notification
    # await send_contact_notification(submission)

    return {"message": "Message received. We'll be in touch within 24 hours.", "id": submission.id}
