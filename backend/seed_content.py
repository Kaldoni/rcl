import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import engine, Base, AsyncSessionLocal
from app.models.blog_project import BlogPost, Project
from app.models.user import User
from app.core.security import hash_password
from app.core.config import settings

ARTICLES = [
    {
        "slug": "role-of-technology-oil-gas-safety",
        "category": "INDUSTRY TRENDS",
        "title": "The Role of Technology in Improving Safety and Efficiency in the Oil and Gas Industry",
        "excerpt": "The oil and gas industry has always been crucial for powering industries, transportation, and economic growth. Modern digital monitoring systems, smart sensors, and automated control technologies have fundamentally transformed how operations are conducted.",
        "author": "Asaba Oghenegoma Godspower",
        "featured_image": "/images/blog-featured.jpg",
        "content": """
          <p>The oil and gas industry has always been crucial for powering industries, transportation, and economic growth. In the early years of the industry, especially between the 1900s and 1970s, operations relied heavily on manual labor and basic mechanical equipment.</p>
          <p>Today, the industry has changed significantly. Modern oil and gas facilities use digital monitoring systems, smart sensors, and automated control technologies that continuously measure pressure, temperature, vibration, and flow rates in real time. Engineers can monitor these systems from centralized control rooms and receive immediate alerts if abnormal conditions occur.</p>
          <h2>The Digital Transformation</h2>
          <p>Drilling technology has also advanced through directional and horizontal drilling, allowing operators to precisely reach reservoirs that were once difficult to access. Companies now use advanced drilling and data technologies to increase production while reducing environmental impact.</p>
          <h2>Predictive Maintenance</h2>
          <p>Maintenance practices have also improved. Instead of waiting for equipment to fail, modern facilities use predictive maintenance systems that analyze equipment data to detect potential problems before they occur. This reduces downtime, improves safety, and saves operational costs.</p>
        """,
        "is_published": True
    },
    {
        "slug": "local-content-development-nigeria",
        "category": "COMPANY UPDATES",
        "title": "How Rewaj is Championing Local Content Development in Nigeria",
        "excerpt": "Since our founding in 2001, Rewaj Corporate Limited has been at the forefront of building local capacity in the Nigerian oil and gas sector. Our commitment to training Nigerian engineers and technicians has resulted in a workforce that rivals international standards.",
        "author": "Lanre Olasupo",
        "featured_image": "/team-offshore.jpg",
        "content": """
          <p>Since our founding in 2001, Rewaj Corporate Limited has been at the forefront of building local capacity in the Nigerian oil and gas sector. Our commitment to training Nigerian engineers and technicians has resulted in a workforce that rivals international standards.</p>
          <p>We believe that the sustainability of the Nigerian energy sector depends on our ability to develop and retain high-quality local talent. That's why we invest heavily in certification programs, hands-on field training, and partnerships with local technical colleges.</p>
          <h2>Building for the Future</h2>
          <p>Our workforce is 100% Nigerian, and we are proud to handle complex engineering and maintenance contracts that were previously managed exclusively by international firms. This not only keeps capital within the country but also builds a legacy of technical excellence for the next generation.</p>
        """,
        "is_published": True
    }
]

PROJECTS = [
    { "slug": "power-system-maintenance", "category": "Power Systems", "tag": "MAINTENANCE", "title": "Power System Maintenance", "description": "Comprehensive overhaul and routine maintenance of HV/LV power distribution units for an offshore production platform, ensuring zero-downtime operations.", "completion_year": "2023", "featured_image": "/images/project-power.jpg", "is_active": True, "client_name": "Total Energies" },
    { "slug": "fire-suppression-upgrades", "category": "Fire Suppression", "tag": "FIRE SAFETY", "title": "Fire Suppression Upgrades", "description": "Installation and commissioning of advanced FM-200 and CO2 suppression systems across multiple remote terminal units (RTUs) for a major IOC.", "completion_year": "2023", "featured_image": "/images/project-fire.jpg", "is_active": True, "client_name": "Shell" },
    { "slug": "automation-systems", "category": "Automation", "tag": "AUTOMATION", "title": "Automation Systems", "description": "Deployment of PLC-based integrated control systems for pipeline pressure monitoring and emergency shutdown (ESD) synchronization.", "completion_year": "2022", "featured_image": "/images/project-automation.jpg", "is_active": True, "client_name": "Renaissance Africa Energy" },
    { "slug": "smart-instrumentation-grid", "category": "Technical Services", "tag": "INSTRUMENTATION", "title": "Smart Instrumentation Grid", "description": "Design and installation of high-precision flowmeters and telemetry systems for real-time crude oil transfer monitoring.", "completion_year": "2022", "featured_image": "/images/project-instrumentation.jpg", "is_active": True, "client_name": "Seplat Energy" },
    { "slug": "gas-processing-plant-retrofit", "category": "Technical Services", "tag": "ENGINEERING", "title": "Gas Processing Plant Retrofit", "description": "Full-scale electrical and mechanical retrofit of an aging natural gas processing facility to meet modern environmental standards.", "completion_year": "2021", "featured_image": "/images/project-gas.jpg", "is_active": True, "client_name": "NLNG" },
    { "slug": "risk-assessment-audits", "category": "Technical Services", "tag": "CONSULTING", "title": "Risk Assessment Audits", "description": "Delivering comprehensive HAZOP and SIL studies for multi-billion dollar brownfield expansion projects across the Niger Delta.", "completion_year": "2021", "featured_image": "/images/project-risk.jpg", "is_active": True, "client_name": "Shell" }
]

async def seed():
    # Ensure tables are created
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        # Seed Articles
        for art_data in ARTICLES:
            existing = await db.scalar(select(BlogPost).where(BlogPost.slug == art_data["slug"]))
            if not existing:
                db.add(BlogPost(**art_data))
        
        # Seed Projects
        for proj_data in PROJECTS:
            existing = await db.scalar(select(Project).where(Project.slug == proj_data["slug"]))
            if not existing:
                db.add(Project(**proj_data))
        
        # Seed Admin
        admin_email = settings.ADMIN_EMAIL_DEFAULT
        existing_admin = await db.scalar(select(User).where(User.email == admin_email))
        if not existing_admin:
            admin = User(
                email=admin_email,
                hashed_password=hash_password(settings.ADMIN_PASSWORD_DEFAULT),
                full_name="Site Administrator",
                is_active=True,
                is_admin=True,
            )
            db.add(admin)
            print(f"Admin user created: {admin_email}")

        await db.commit()
        print("Content seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed())
