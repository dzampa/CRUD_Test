USE [CRUD_Test]
GO
/****** Object:  Table [dbo].[Functionalities]    Script Date: 28/05/2020 12:01:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Functionalities](
	[idFunctionalities] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Functionalities] PRIMARY KEY CLUSTERED 
(
	[idFunctionalities] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 28/05/2020 12:01:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[idProfile] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Profile] PRIMARY KEY CLUSTERED 
(
	[idProfile] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile_Functionalities]    Script Date: 28/05/2020 12:01:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile_Functionalities](
	[idProfile] [int] NOT NULL,
	[idFunctionalities] [int] NOT NULL,
 CONSTRAINT [PK_Profile_Functionalities] PRIMARY KEY CLUSTERED 
(
	[idProfile] ASC,
	[idFunctionalities] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 28/05/2020 12:01:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[idUser] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[CPF] [decimal](11, 0) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[idUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Profile]    Script Date: 28/05/2020 12:01:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Profile](
	[idUser] [int] NOT NULL,
	[idProfile] [int] NOT NULL,
 CONSTRAINT [PK_User_Profile] PRIMARY KEY CLUSTERED 
(
	[idUser] ASC,
	[idProfile] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Profile_Functionalities]  WITH CHECK ADD  CONSTRAINT [FK_Profile_Functionalities_Functionalities] FOREIGN KEY([idFunctionalities])
REFERENCES [dbo].[Functionalities] ([idFunctionalities])
GO
ALTER TABLE [dbo].[Profile_Functionalities] CHECK CONSTRAINT [FK_Profile_Functionalities_Functionalities]
GO
ALTER TABLE [dbo].[Profile_Functionalities]  WITH CHECK ADD  CONSTRAINT [FK_Profile_Functionalities_Profile] FOREIGN KEY([idProfile])
REFERENCES [dbo].[Profile] ([idProfile])
GO
ALTER TABLE [dbo].[Profile_Functionalities] CHECK CONSTRAINT [FK_Profile_Functionalities_Profile]
GO
ALTER TABLE [dbo].[User_Profile]  WITH CHECK ADD  CONSTRAINT [FK_User_Profile_Profile] FOREIGN KEY([idProfile])
REFERENCES [dbo].[Profile] ([idProfile])
GO
ALTER TABLE [dbo].[User_Profile] CHECK CONSTRAINT [FK_User_Profile_Profile]
GO
ALTER TABLE [dbo].[User_Profile]  WITH CHECK ADD  CONSTRAINT [FK_User_Profile_User] FOREIGN KEY([idUser])
REFERENCES [dbo].[User] ([idUser])
GO
ALTER TABLE [dbo].[User_Profile] CHECK CONSTRAINT [FK_User_Profile_User]
GO
USE [master]
GO
ALTER DATABASE [CRUD_Test] SET  READ_WRITE 
GO
